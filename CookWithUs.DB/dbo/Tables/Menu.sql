CREATE TABLE [dbo].[Menu] (
    [ID]              BIGINT         IDENTITY (1, 1) NOT NULL,
    [RestaurantID]    INT            NULL,
    [Name]            NVARCHAR (255) NULL,
    [Type]            NVARCHAR (50)  NULL,
    [Price]           INT            NULL,
    [Quantity]        INT            NULL,
    [ImageID]         BIGINT         NULL,
    [rating]          VARCHAR (5)    NULL,
    [customer]        VARCHAR (10)   NULL,
    [info]            VARCHAR (200)  NULL,
    [CategoryID]      INT            NULL,
    [InStock]         INT            NULL,
    [NextStockTime]   NVARCHAR (50)  NULL,
    [PackingPrice]    INT            NULL,
    [GstPrice]        INT            NULL,
    [ItemCookingTime] VARCHAR (50)   NULL,
    [IsDeleted]       INT            DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    FOREIGN KEY ([ImageID]) REFERENCES [dbo].[Document] ([ID]),
    FOREIGN KEY ([RestaurantID]) REFERENCES [dbo].[Restaurant] ([ID])
);



