Tests
=================

### Failure (illegal move) scenarios

```
Given[placed(1, 0, X)]
When(placed(1, 0, X))
Then(Illegal move, This square is already filled)
```

```
Given[placed(2, 1, X)]
When(placed(2, 1, O))
Then(Illegal move, This square is already filled)
```

### Winning scenarios

```
Given[placed(0, 0, X), placed(1, 0, O),
      placed(1, 1, X), placed(1, 2, O)]
When(placed(2, 2, X))
Then("X Wins!")
```

```
Given[placed(1, 1, X), placed(0, 0, O),
      placed(0, 1, X), placed(1, 0, O),
      placed(1, 2, X)]
When(placed(2, 0, O))
Then("O Wins!")
```

```
Given[placed(0, 2, X), placed(2, 0, O),
      placed(1, 1, X), placed(2, 1, O),
      placed(0, 1, X)]
When(placed(2, 2, O))
Then("O Wins!")
```

### Draw scenarios

```
Given[placed(0, 0, X), placed(1, 1, O),
      placed(1, 2, X), placed(1, 0, O),
      placed(2, 0, X), placed(0, 2, O),
      placed(2, 1, X), placed(2, 2, O)]
When(placed(0, 1, X))
Then("A Draw!")
```
