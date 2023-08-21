# Railway oriented programming in TypeScript

## Introduction

Package includes types, interfaces and functions for support of railway oriented programming.

## Installation

`npm install @kozderka/railway`

## Documentation

### Interfaces

```
interface Success<T> {
    readonly success: boolean
    readonly value: T
}
```

```
export interface Failure {
  readonly success: boolean
  readonly error: string
}

```

### Types

```
type Result<T> = Success<T> | Failure
```

### Functions

#### success

Creates successful result.

#### failure

Creates failure result.

#### isSuccess

Checks if result is success.

#### isFailure

Checks if result is failure

#### getValue

Returns value from result.

#### compose

Performs function composition from right to left.

#### pipe

Performs function composition from left to right.
