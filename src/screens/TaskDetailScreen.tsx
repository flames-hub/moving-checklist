import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useMoveStore } from '../store/moveStore';
import { useTheme } from '../hooks/useTheme';
import { CATEGORY_ICONS } from '../constants/icons';
import Card from '../components/GlassCard';
import { Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';
import { RootStackParamList } from '../navigation/AppNavigator';

type RouteType = RouteProp<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
  const { t } = useTranslation();
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteType>();
  const navigation = useNavigation();
  const { tasks, toggleTask, updateTaskNote, addTaskPhoto, removeTaskPhoto, deleteTask } =
    useMoveStore();
  const task = tasks.find((tk) => tk.id === route.params.taskId);

  const [note, setNote] = useState(task?.note ?? '');
  const [noteEditing, setNoteEditing] = useState(false);
  const noteRef = useRef<TextInput>(null);

  if (!task) return null;

  const catColorMap: Record<string, string> = {
    procedures: colors.categoryProcedures,
    packing: colors.categoryPacking,
    cancellation: colors.categoryCancellation,
    new_home: colors.categoryNewHome,
    other: colors.categoryOther,
  };
  const catColor = catColorMap[task.category] ?? colors.textSecondary;
  const catIcon = CATEGORY_ICONS[task.category] ?? 'ellipsis-horizontal-circle';

  const handleSaveNote = () => {
    updateTaskNote(task.id, note);
    setNoteEditing(false);
    Keyboard.dismiss();
  };

  const handlePickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      addTaskPhoto(task.id, result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) return;
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!result.canceled && result.assets[0]) {
      addTaskPhoto(task.id, result.assets[0].uri);
    }
  };

  const handleRemovePhoto = (uri: string) => {
    Alert.alert(t('task.removePhotoTitle'), t('task.removePhotoMsg'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: () => removeTaskPhoto(task.id, uri) },
    ]);
  };

  const photos = task.photos ?? [];

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Close bar */}
      <View style={[styles.closeBar, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusPill,
            { backgroundColor: task.isCompleted ? colors.successSoft : colors.primarySoft },
          ]}
          onPress={() => toggleTask(task.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={task.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
            size={18}
            color={task.isCompleted ? colors.success : colors.primary}
          />
          <Text
            style={[
              styles.statusText,
              { color: task.isCompleted ? colors.success : colors.primary },
            ]}
          >
            {task.isCompleted ? t('task.markIncomplete') : t('task.markComplete')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Category + Title */}
        <View style={styles.categoryRow}>
          <Ionicons name={catIcon as any} size={18} color={catColor} />
          <Text style={[styles.categoryLabel, { color: catColor }]}>
            {t(`categories.${task.category}`)}
          </Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>

        {/* Description */}
        {task.description ? (
          <Card style={styles.descCard}>
            <View style={styles.descInner}>
              <View style={styles.descHeader}>
                <Ionicons name="information-circle-outline" size={18} color={colors.primary} />
                <Text style={[styles.descHeaderText, { color: colors.primary }]}>
                  {t('task.detail')}
                </Text>
              </View>
              <Text style={[styles.descText, { color: colors.text }]}>{task.description}</Text>
            </View>
          </Card>
        ) : null}

        {/* Photos */}
        <View style={styles.sectionRow}>
          <Ionicons name="camera-outline" size={20} color={colors.text} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('task.photos')}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
          {photos.map((uri) => (
            <TouchableOpacity key={uri} onLongPress={() => handleRemovePhoto(uri)} activeOpacity={0.8}>
              <Image source={{ uri }} style={styles.photo} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.addPhotoBtn, { borderColor: colors.border }]}
            onPress={handleTakePhoto}
            activeOpacity={0.7}
          >
            <Ionicons name="camera" size={24} color={colors.primary} />
            <Text style={[styles.addPhotoText, { color: colors.textSecondary }]}>
              {t('task.takePhoto')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addPhotoBtn, { borderColor: colors.border }]}
            onPress={handlePickPhoto}
            activeOpacity={0.7}
          >
            <Ionicons name="images-outline" size={24} color={colors.primary} />
            <Text style={[styles.addPhotoText, { color: colors.textSecondary }]}>
              {t('task.pickPhoto')}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Note */}
        <View style={styles.sectionRow}>
          <Ionicons name="create-outline" size={20} color={colors.text} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('task.note')}</Text>
        </View>
        <Card>
          <TextInput
            ref={noteRef}
            style={[styles.noteInput, { color: colors.text }]}
            value={note}
            onChangeText={setNote}
            onFocus={() => setNoteEditing(true)}
            placeholder={t('task.notePlaceholder')}
            placeholderTextColor={colors.textSecondary}
            multiline
          />
          {noteEditing && (
            <View style={[styles.noteActions, { borderTopColor: colors.border }]}>
              <TouchableOpacity
                onPress={() => {
                  setNote(task.note ?? '');
                  setNoteEditing(false);
                  Keyboard.dismiss();
                }}
              >
                <Text style={[styles.noteCancel, { color: colors.textSecondary }]}>
                  {t('common.cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.noteSaveBtn, { backgroundColor: colors.primary }]}
                onPress={handleSaveNote}
              >
                <Text style={styles.noteSaveText}>{t('common.save')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>

        {/* Delete */}
        {task.isCustom && (
          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: colors.errorSoft }]}
            onPress={() => {
              deleteTask(task.id);
              navigation.goBack();
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={18} color={colors.error} />
            <Text style={[styles.deleteText, { color: colors.error }]}>{t('common.delete')}</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: insets.bottom + 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  closeBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  statusText: { fontSize: FontSize.sm, fontWeight: '700' },
  content: { padding: Spacing.lg },
  categoryRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.xs },
  categoryLabel: { fontSize: FontSize.sm, fontWeight: '600' },
  title: { fontSize: FontSize.xl + 2, fontWeight: '800', lineHeight: 32, marginBottom: Spacing.md },
  descCard: { marginBottom: Spacing.lg },
  descInner: { padding: Spacing.md },
  descHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.sm },
  descHeaderText: { fontSize: FontSize.sm, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6 },
  descText: { fontSize: FontSize.md, lineHeight: 26 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: Spacing.sm, marginTop: Spacing.md },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700' },
  photoScroll: { marginBottom: Spacing.sm },
  photo: { width: 100, height: 100, borderRadius: BorderRadius.md, marginRight: Spacing.sm },
  addPhotoBtn: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  addPhotoText: { fontSize: FontSize.xs, marginTop: 4, textAlign: 'center' },
  noteInput: {
    padding: Spacing.md,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: FontSize.md,
    lineHeight: 24,
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  noteCancel: { fontSize: FontSize.md, padding: Spacing.sm },
  noteSaveBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
  },
  noteSaveText: { color: '#fff', fontSize: FontSize.md, fontWeight: '700' },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: Spacing.xl,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  deleteText: { fontSize: FontSize.md, fontWeight: '600' },
});
