export type TongasoaProps = {
  /**
   * The name to be displayed in the greeting message.
   * @default 'World'
   */
  name?: string;
  /**
   * Determines whether the title is visible.
   * @default true
   */
  isTitleVisible?: boolean;
};

export type FormValues = {
  /** The name of the user */
  name: string;
  /** The profile photo of the user */
  photo?: File;
};
