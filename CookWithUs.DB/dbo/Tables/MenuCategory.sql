CREATE TABLE [dbo].[MenuCategory] (
    [RestaurantId]  NCHAR (10)    NULL,
    [CategoryName]  NVARCHAR (50) NULL,
    [InStock]       NCHAR (10)    NULL,
    [NextStockTime] VARCHAR (50)  NULL,
    [IsDeleted]     NCHAR (10)    CONSTRAINT [DF_Table_1_IsActive] DEFAULT ((0)) NULL,
    [Id]            INT           IDENTITY (1, 1) NOT NULL,
    CONSTRAINT [PK_MenuCategory] PRIMARY KEY CLUSTERED ([Id] ASC)
);

ALTER TABLE [dbo].[MenuCategory] ADD  CONSTRAINT [DF_Table_1_IsActive]  DEFAULT ((0)) FOR [IsDeleted]
GO