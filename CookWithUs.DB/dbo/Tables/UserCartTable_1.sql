CREATE TABLE [dbo].[UserCartTable] (
    [Id]                 INT           IDENTITY (1, 1) NOT NULL,
    [UserId]             INT           NULL,
    [ItemId]             INT           NULL,
    [Quantity]           INT           NULL,
    [Time]               DATETIME      NULL,
    [RestaurantName]     VARCHAR (100) NULL,
    [RestaurantLocation] VARCHAR (100) NULL,
    [RestaurantId]       INT           NULL,
    [Price]              FLOAT (53)    NULL,
    [Name]               VARCHAR (50)  NULL,
    [DiscountedPrice]    FLOAT (53)    NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

