# Railway oriented programming in TypeScript

## Introduction

Package includes types, interfaces and functions for support of railway oriented programming.

## Installation

`npm install @kozderka/railway`

## Documentation

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [Success](#success)
    *   [Properties](#properties)
*   [Failure](#failure)
    *   [Properties](#properties-1)
*   [Result](#result)
*   [success](#success-1)
    *   [Parameters](#parameters)
*   [failure](#failure-1)
    *   [Parameters](#parameters-1)
*   [isSuccess](#issuccess)
    *   [Parameters](#parameters-2)
*   [isFailure](#isfailure)
    *   [Parameters](#parameters-3)
*   [getValue](#getvalue)
    *   [Parameters](#parameters-4)
*   [map](#map)
    *   [Parameters](#parameters-5)
*   [chain](#chain)
    *   [Parameters](#parameters-6)
*   [tee](#tee)
    *   [Parameters](#parameters-7)

### Success

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `tag` **`"success"`**&#x20;
*   `value` **T**&#x20;

### Failure

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `tag` **`"failure"`**&#x20;
*   `error` **T**&#x20;

### Result

Type: ([Success](#success)\<T> | [Failure](#failure)\<U>)

### success

#### Parameters

*   `value` **T**&#x20;

Returns **[Success](#success)\<T>**&#x20;

### failure

#### Parameters

*   `error` **T**&#x20;

Returns **[Failure](#failure)\<T>**&#x20;

### isSuccess

#### Parameters

*   `result` **[Result](#result)**&#x20;

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)**&#x20;

### isFailure

#### Parameters

*   `result` **[Result](#result)**&#x20;

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)**&#x20;

### getValue

#### Parameters

*   `result` **[Result](#result)\<T, U>**&#x20;

Returns **T**&#x20;

### map

#### Parameters

*   `f` **function (any): any**&#x20;

Returns **function (any): [Success](#success)\<T>**&#x20;

### chain

#### Parameters

*   `f` **function (any): any**&#x20;

Returns **function (any): any**&#x20;

### tee

#### Parameters

*   `f` **function (any): any**&#x20;

Returns **function ([Result](#result)\<T, U>): [Result](#result)\<T, U>**&#x20;
