## membersテーブル

| Column   | Type    | Options |
 --------- | ------- | --------
| user  | references | null: false, foreign_key: true |
| group | references | null: false, foreign_key: true |

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
| Column | Type   | Options |
 ------- | ------ | --------
| name   | string | null: false, index: true |
| email  | string | null: false, |

### Association
- has_many :messages
- has_many :members
- has_many :groups,through::members

## groupsテーブル
| Column | Type   | Options |
 ------- | ------ | --------
| name   | string | null: false, index: true |

### Association
- has_many :users, through::members
- has_many :members
- has_many :messages

## messagesテーブル
| Column   | Type    | Options |
 --------- | -------   | --------
| body     | string    | ------- |
| image    | string    | ------- |
| user     | references | null: false, foreign_key: true |
| group    | references | null: false, foreign_key: true |

### Association
- belongs_to :group
- belongs_to :user

