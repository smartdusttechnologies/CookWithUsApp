CREATE TABLE [dbo].[Menu] (
    [ID]           BIGINT         IDENTITY (1, 1) NOT NULL,
    [RestaurantID] INT            NULL,
    [Name]         NVARCHAR (255) NULL,
    [Type]         NVARCHAR (50)  NULL,
    [Price]        INT            NULL,
    [Quantity]     INT            NULL,
    [ImageID]      BIGINT         NULL,
    [rating] varchar(5) NULL,
	[customer] varchar(10) NULL,
	[info] varchar(200) NULL,
	[CategoryID] int NULL,
	[InStock] int NULL,
	[NextStockTime] nvarchar(50) NULL,
	[PackingPrice] int NULL,
	[GstPrice] int NULL,
	[ItemCookingTime] varchar(50) NULL,
	[IsDeleted] int NOT NULL DEFAULT 0,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    FOREIGN KEY ([ImageID]) REFERENCES [dbo].[Document] ([ID]),
    FOREIGN KEY ([RestaurantID]) REFERENCES [dbo].[Restaurant] ([ID])
);

