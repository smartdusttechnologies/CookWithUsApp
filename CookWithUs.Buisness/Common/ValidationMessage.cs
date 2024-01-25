﻿namespace SmartdustApp.Business.Common
{
    public class ValidationMessage
    {
        /// <summary>
        /// Decaring Public properties for validation
        /// </summary>
        #region Public Properties
        public string Reason { get; set; }

        public virtual ValidationSeverity Severity { get; set; }
        public string MessageKey { get; set; }
        public string SourceId { get; set; }
        public string Description { get; set; }
        #endregion
    }

    public enum ValidationSeverity
    {
        None,
        Information,
        Warning,
        Error,
        Critical,
    }
}
