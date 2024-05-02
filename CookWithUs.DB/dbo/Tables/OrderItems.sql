CREATE TABLE [dbo].[OrderItems] (
    [Id]                 INT             IDENTITY (1, 1) NOT NULL,
    [UserId]             INT             NULL,
    [OrderId]            INT             NULL,
    [Name]               VARCHAR (100)   NULL,
    [ItemId]             INT             NULL,
    [Quantity]           INT             NULL,
    [RestaurantId]       INT             NULL,
    [Price]              DECIMAL (10, 2) NULL,
    [DiscountedPrice]    DECIMAL (10, 2) NULL,
    [Time]               DATETIME        NULL,
    [RestaurantLocation] VARCHAR (100)   NULL,
    [RestaurantName]     VARCHAR (100)   NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

