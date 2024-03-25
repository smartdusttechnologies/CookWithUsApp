CREATE TABLE [dbo].[RestaurantPartner] (
    [RestaurantID] INT    NULL,
    [UserID]       BIGINT NULL,
    FOREIGN KEY ([RestaurantID]) REFERENCES [dbo].[Restaurant] ([ID]),
    FOREIGN KEY ([UserID]) REFERENCES [dbo].[User] ([Id])
);

