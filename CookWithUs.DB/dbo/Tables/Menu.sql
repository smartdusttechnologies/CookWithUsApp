CREATE TABLE [dbo].[Menu] (
    [ID]           BIGINT         IDENTITY (1, 1) NOT NULL,
    [RestaurantID] INT            NULL,
    [Name]         NVARCHAR (255) NULL,
    [Type]         NVARCHAR (50)  NULL,
    [Price]        INT            NULL,
    [Quantity]     INT            NULL,
    [ImageID]      BIGINT         NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    FOREIGN KEY ([ImageID]) REFERENCES [dbo].[Document] ([ID]),
    FOREIGN KEY ([RestaurantID]) REFERENCES [dbo].[Restaurant] ([ID])
);

