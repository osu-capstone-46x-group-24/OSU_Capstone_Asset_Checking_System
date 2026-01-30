## Check-In Request

_Represents a return operation for a previously checked-out item._

### Endpoint
`POST /checkin`

### Payload

| Field            | Type             | Required |
| :--------------- | :--------------- | :------- |
| `userId`         | `number` (int)   | yes |
| `itemId`         | `number` (int)   | yes |
| `timestampId`    | `number` (int)   | yes |

### Result

| Field              | Type                |
| :----------------- | :------------------ |
| `status`           | `string`            |
| `checkinTimestamp` | `string`            |

---

## Check-Out Request

_Represents a checkout session for one or more items._

### Endpoint
`POST /checkout`

### Payload

| Field             | Meaning                            | Type                     | Required |
| :---------------- | :--------------------------------- | :----------------------- | :------- |
| `userId`          | Requesting user identifier         | `number` (int)           | yes |
| `items`           | Item identifiers                   | `number[]`               | yes |
| `expectedReturn`  | Planned return time                | `string`                 | yes |

### Result

| Field         | Type        |
| :------------ | :---------- |
| `status`      | `string`    |
| `timestampId` | `number`    |
| `items`       | `number[]`  |

---

## Item Descriptor

_Represents a physical or virtual item available for checkout._

### Structure

- **Single item**
  - `name` (`string`) — Display name
  - `rfid` (`string`) — Unique identifier

- **Multiple items**
  - Array of item objects with:
    - `name` (`string`)
    - `rfid` (`string`)

_All fields required._

---

## Transaction Identity

_A single transaction is uniquely identified by:_

- `userId`
- `itemId`
- `timestampId`

This identifier set is required when performing a check-in operation.
