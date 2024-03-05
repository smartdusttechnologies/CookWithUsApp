CREATE TABLE [dbo].[DeliveryPartner] (
    [ID]        INT            IDENTITY (1, 1) NOT NULL,
    [Name]      NVARCHAR (255) NOT NULL,
    [Phone]     NVARCHAR (20)  NOT NULL,
    [Email]     NVARCHAR (255) NOT NULL,
    [Latitude]  DECIMAL (9, 6) NOT NULL,
    [Longitude] DECIMAL (9, 6) NOT NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC)
);

