/**
 * Block dependencies
 */
import icon from "../icon";
import "./style.scss";
import "./editor.scss";

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

/**
 * Register block
 */
export default registerBlockType("customgutenbergblock/demo", {
  title: __("Demo Block", "customgutenbergblock"),
  description: __(
    "How to use the RichText component for building your own editable blocks.",
    "customgutenbergblock"
  ),
  category: "common",
  icon: {
    background: "#FFFFFF",
    src: icon
  },
  keywords: [
    __("How to", "customgutenbergblock"),
    __("Example", "customgutenbergblock"),
    __("RichText", "customgutenbergblock")
  ],
  supports: {
    html: false
  },
  attributes: {
    message: {
      type: "array",
      source: "children",
      selector: ".message-body"
    }
  },
  edit: props => {
    const {
      attributes: { message },
      className,
      setAttributes
    } = props;
    const onChangeMessage = message => {
      setAttributes({ message });
    };
    return (
      <div className={className}>
        <h2>{__("Call to Action", "customgutenbergblock")}</h2>
        <RichText
          tagName="div"
          multiline="p"
          placeholder={__("Add your custom message", "customgutenbergblock")}
          onChange={onChangeMessage}
          value={message}
        />
      </div>
    );
  },
  save: props => {
    const {
      attributes: { message }
    } = props;
    return (
      <div>
        <h2>{__("Call to Action", "customgutenbergblock")}</h2>
        <div class="message-body">{message}</div>
      </div>
    );
  }
});
