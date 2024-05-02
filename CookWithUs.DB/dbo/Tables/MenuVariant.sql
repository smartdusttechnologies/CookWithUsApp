CREATE TABLE [dbo].[MenuVariant] (
    [Id]           INT             NOT NULL,
    [MenuId]       INT             NULL,
    [VariantName]  VARCHAR (50)    NULL,
    [VariantImage] VARCHAR (50)    NULL,
    [VariantInfo]  VARBINARY (200) NULL,
    [IsDeleted]    INT             NULL,
    CONSTRAINT [PK_MenuVariant] PRIMARY KEY CLUSTERED ([Id] ASC)
);

