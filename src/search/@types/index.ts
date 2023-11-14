export type MethodParamsOptions = {
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
  page_content: string;
  type: 'Document';
  metadata: MetaDataType;
};
