# API reference

## Checkin

_Object containing the following properties:_

| Property               | Type             |
| :--------------------- | :--------------- |
| **`userId`** (\*)      | `number` (_int_) |
| **`itemId`** (\*)      | `number` (_int_) |
| **`timestampId`** (\*) | `number` (_int_) |

_(\*) Required._

## Checkout

_Object containing the following properties:_

| Property          | Description                         | Type                    |
| :---------------- | :---------------------------------- | :---------------------- |
| **`userId`** (\*) | User id                             | `number` (_int_)        |
| **`items`** (\*)  | Flat array of itemId's              | `Array<number (_int_)>` |
| `expectedReturn`  | Expected time item will be returned | `string` (_ISO 8601_)   |

_(\*) Required._
