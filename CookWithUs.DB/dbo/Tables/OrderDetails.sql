CREATE TABLE [dbo].[OrderDetails] (
    [OrderID]         INT             IDENTITY (1, 1) NOT NULL,
    [UserID]          INT             NULL,
    [OrderDate]       DATETIME        NULL,
    [DeliveryAddress] VARCHAR (255)   NULL,
    [PaymentMethod]   VARCHAR (50)    NULL,
    [TotalAmount]     DECIMAL (10, 2) NULL,
    [OrderStatus]     VARCHAR (50)    NULL,
    [RiderId]         INT             NULL,
    [RestaurantId]    INT             NULL,
    PRIMARY KEY CLUSTERED ([OrderID] ASC)
);

