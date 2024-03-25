CREATE TABLE [dbo].[OrderHistory] (
    [ID]            INT           IDENTITY (1, 1) NOT NULL,
    [UserId]        INT           NULL,
    [OrderName]     VARCHAR (255) NULL,
    [OrderDateTime] DATETIME      NULL,
    [Latitude]      FLOAT (53)    NULL,
    [Longitude]     FLOAT (53)    NULL,
    [OrderStatus]   VARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC)
);

