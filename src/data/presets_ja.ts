import { TaskCategory } from '../types';

export interface PresetTask {
  title: string;
  description: string;
  category: TaskCategory;
  timingDays: number;
}

export const presetsJa: PresetTask[] = [
  // --- 2ヶ月前 (-60) ---
  { title: '引越し業者の比較・見積もり', description: '最低3社から見積もりを取る。一括見積もりサイトが便利。', category: 'procedures', timingDays: -60 },
  { title: '不用品の処分開始', description: '粗大ゴミは自治体に予約が必要（1〜2週間待ち）。リサイクルショップやフリマアプリも活用。', category: 'packing', timingDays: -60 },
  { title: '新居の下見・契約', description: '契約時に必要: 身分証明書、印鑑、収入証明書、保証人情報。', category: 'new_home', timingDays: -55 },
  { title: '引越し費用の概算', description: '業者費用 + 敷金礼金 + 初期費用 + 生活用品。予算の120%を準備する。', category: 'procedures', timingDays: -55 },
  { title: '学校・幼稚園の転校手続き確認', description: '在学証明書・教科書給与証明書が必要。転校先に連絡して必要書類を確認。', category: 'procedures', timingDays: -50 },

  // --- 1ヶ月前 (-30) ---
  { title: '転出届の提出', description: '市区町村役場で提出。引越し14日前から届出可能。転出証明書を受け取る。', category: 'procedures', timingDays: -30 },
  { title: '電気の解約・開通手続き', description: '旧居の解約と新居の開通をそれぞれの電力会社に連絡。WebかTelで手続き。', category: 'cancellation', timingDays: -28 },
  { title: 'ガスの解約・開通手続き', description: '新居のガス開栓は立ち会いが必要。早めに予約する。', category: 'cancellation', timingDays: -28 },
  { title: '水道の解約・開通手続き', description: '旧居の水道局と新居の水道局にそれぞれ連絡。', category: 'cancellation', timingDays: -28 },
  { title: 'インターネット回線の移転/解約', description: '移転に2〜4週間かかる場合あり。新居で工事が必要か確認。', category: 'cancellation', timingDays: -28 },
  { title: 'NHK住所変更', description: 'NHKのWebサイトまたはTelで住所変更届出。', category: 'procedures', timingDays: -25 },
  { title: '郵便局の転送届（e転居）', description: '郵便局窓口またはe転居（オンライン）で届出。届出から転送開始まで3〜7営業日。', category: 'procedures', timingDays: -25 },
  { title: '新聞・定期購読の住所変更/解約', description: '新聞販売店に連絡。定期購読サービスの住所変更も忘れずに。', category: 'cancellation', timingDays: -25 },
  { title: '火災保険の住所変更', description: '保険会社に連絡して住所変更。新居用の火災保険への切り替えも検討。', category: 'procedures', timingDays: -22 },
  { title: '銀行口座の住所変更', description: 'ネットバンキングまたは窓口で手続き。通帳・届出印が必要な場合あり。', category: 'procedures', timingDays: -22 },
  { title: 'クレジットカードの住所変更', description: 'Web会員ページから変更可能な場合が多い。', category: 'procedures', timingDays: -22 },
  { title: '携帯電話の住所変更', description: 'キャリアのWebサイトまたは店舗で手続き。', category: 'procedures', timingDays: -20 },
  { title: '各種サブスクの住所変更', description: 'Amazon、楽天、その他ECサイトの配送先住所を更新。', category: 'procedures', timingDays: -20 },

  // --- 2週間前 (-14) ---
  { title: '荷造り開始（使わないものから）', description: 'オフシーズンの衣類、書籍、装飾品から。ダンボールに中身と部屋名を記入。', category: 'packing', timingDays: -14 },
  { title: 'ダンボール・梱包材の準備', description: '引越し業者からもらえる場合あり。足りなければホームセンターで追加購入。', category: 'packing', timingDays: -14 },
  { title: '近隣への引越し挨拶品の準備', description: '旧居の両隣・上下階に挨拶。500〜1000円程度の日用品が定番。', category: 'other', timingDays: -12 },
  { title: '転居はがき/連絡の準備', description: '年賀状リストの相手に転居通知。LINEやメールでの連絡も可。', category: 'other', timingDays: -12 },

  // --- 1週間前 (-7) ---
  { title: '冷蔵庫の中身整理', description: '食材を使い切る計画を立てる。引越し前日には電源を切り、水抜きする。', category: 'packing', timingDays: -7 },
  { title: '洗濯機の水抜き', description: '給水ホース→排水ホースの順で水抜き。取扱説明書を確認。', category: 'packing', timingDays: -5 },
  { title: '貴重品・重要書類をまとめる', description: '通帳、印鑑、パスポート、保険証、年金手帳。引越し業者に預けず自分で運ぶ。', category: 'packing', timingDays: -5 },
  { title: '当日の持ち物リスト作成', description: '携帯充電器、着替え、洗面用具、掃除道具、ゴミ袋、カッター、ガムテープ。', category: 'packing', timingDays: -3 },
  { title: 'ご近所への挨拶', description: '「お世話になりました」の挨拶。粗品を渡す。', category: 'other', timingDays: -3 },

  // --- 当日 (0) ---
  { title: '引越し業者の最終確認', description: '到着時間、搬出順、新居への搬入順を確認。', category: 'procedures', timingDays: 0 },
  { title: '旧居の最終チェック', description: '全部屋・クローゼット・バルコニーを確認。忘れ物がないかチェック。', category: 'packing', timingDays: 0 },
  { title: '電気・ガス・水道のメーター確認', description: '退去時のメーター数値を記録・撮影しておく。', category: 'cancellation', timingDays: 0 },
  { title: '鍵の返却', description: '合鍵も含めて全ての鍵を返却。管理会社に連絡。', category: 'procedures', timingDays: 0 },
  { title: '新居の傷・汚れチェック', description: '入居前に全箇所の写真を撮影。日付入りで記録しておくとトラブル防止になる。', category: 'new_home', timingDays: 0 },

  // --- 引越し後 (+1〜) ---
  { title: '転入届の提出（14日以内）', description: '新住所の市区町村役場へ。転出証明書・本人確認書類・印鑑を持参。', category: 'procedures', timingDays: 3 },
  { title: 'マイナンバーカードの住所変更', description: '転入届と同時に市区町村役場で手続き可能。', category: 'procedures', timingDays: 3 },
  { title: '運転免許証の住所変更', description: '警察署または運転免許センターへ。新住所の住民票が必要。', category: 'procedures', timingDays: 7 },
  { title: '車庫証明の届出', description: '警察署で手続き。車を所有している場合のみ。', category: 'procedures', timingDays: 10 },
  { title: '自動車の登録変更', description: '運輸支局で手続き。車検証・車庫証明・住民票が必要。', category: 'procedures', timingDays: 14 },
  { title: '犬の登録変更', description: '新住所の市区町村役場で届出。鑑札・注射済証を持参。', category: 'procedures', timingDays: 14 },
  { title: '選挙人名簿の登録', description: '転入届を出せば自動的に登録される（3ヶ月後に名簿登載）。確認不要。', category: 'procedures', timingDays: 7 },
  { title: '新居のご近所への挨拶', description: '両隣・上下階に挨拶。500〜1000円程度の日用品を持参。', category: 'other', timingDays: 1 },
  { title: 'かかりつけ医・歯医者の変更検討', description: '新居近くの病院を探す。紹介状が必要な場合は旧主治医に依頼。', category: 'other', timingDays: 14 },
];
