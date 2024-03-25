CREATE TABLE [dbo].[Document] (
    [ID]        BIGINT          IDENTITY (1, 1) NOT NULL,
    [DocUrl]    VARCHAR (500)   NULL,
    [Name]      NVARCHAR (255)  NULL,
    [FileType]  NVARCHAR (50)   NULL,
    [DataFiles] VARBINARY (MAX) NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC)
);

