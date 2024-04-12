CREATE TABLE [dbo].[UserAddress] (
    [Id]           INT           IDENTITY (1, 1) NOT NULL,
    [UserId]       INT           NULL,
    [Address]      VARCHAR (255) NULL,
    [LocationType] VARCHAR (100) NULL,
    [LandMark]     VARCHAR (100) NULL,
    [Building]     VARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);



