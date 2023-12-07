export type MethodParamsOptions = {
  /**
   * The context ID to be used for the request, you can get all context IDs by calling `hyper.contexts.all()` and then using the `id` field from the response.
   */
  contextId: string;
};

type MetaDataType =
  | { type: 'airtable'; source: string; name: string }
  | { type: 'slack'; source: string; channel: string; name: string }
  | { type: 'notion'; source: string; page_id: string; name: string }
  | {
      type: 'google-doc';
      name: string;
      when: string;
      title: string;
      source: { doc_id: string; file_id: string };
    }
  | {
      type: 'document';
      file_name: string;
      name: string;
      page_label: string;
      source: string;
    }
  | {
      type: 'web';
      name: string;
      source: string;
    }
  | {
      type: 'text-snippet';
      name: string;
      source: string;
    }
  | {
      type: 'Slack Message';
      name: string;
      source: string;
    };

export type SearchResultData = {
  /**
   * The content of the document
   */
  page_content: string;
  /**
   * The type of the document
   */
  type: 'Document';
  /**
   * Metadata about the document
   */
  metadata: MetaDataType;
};
