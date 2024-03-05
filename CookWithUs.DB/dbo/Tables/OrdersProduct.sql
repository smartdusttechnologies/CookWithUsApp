CREATE TABLE [dbo].[OrdersProduct] (
    [OrderID]   BIGINT NULL,
    [ProductID] BIGINT NULL,
    [Quantity]  BIGINT NULL,
    FOREIGN KEY ([OrderID]) REFERENCES [dbo].[Orders] ([ID]),
    FOREIGN KEY ([ProductID]) REFERENCES [dbo].[Menu] ([ID])
);

