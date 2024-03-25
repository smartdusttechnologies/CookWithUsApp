CREATE TABLE [dbo].[Orders] (
    [ID]            BIGINT         IDENTITY (1, 1) NOT NULL,
    [UserID]        BIGINT         NULL,
    [Address]       NVARCHAR (355) NULL,
    [ZipCode]       BIGINT         NULL,
    [OrderPrice]    BIGINT         NULL,
    [Phone]         NVARCHAR (50)  NULL,
    [Latitude]      DECIMAL (9, 6) NULL,
    [Longitude]     DECIMAL (9, 6) NULL,
    [OrderStatus]   VARCHAR (50)   NULL,
    [RiderId]       INT            NULL,
    [OrderDateTime] DATETIME       NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    FOREIGN KEY ([UserID]) REFERENCES [dbo].[User] ([Id])
);

