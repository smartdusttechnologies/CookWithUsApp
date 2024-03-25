CREATE TABLE [dbo].[Restaurant] (
    [ID]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (255) NOT NULL,
    [Address]     NVARCHAR (255) NOT NULL,
    [OpeningTime] TIME (7)       NULL,
    [ImageID]     BIGINT         NULL,
    [Latitude]    DECIMAL (9, 6) NULL,
    [Longitude]   DECIMAL (9, 6) NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    FOREIGN KEY ([ImageID]) REFERENCES [dbo].[Document] ([ID])
);

