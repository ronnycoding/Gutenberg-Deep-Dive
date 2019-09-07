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
const {
	registerBlockType,
} = wp.blocks;

const {
	RichText,
	AlignmentToolbar,
	BlockControls,
} = wp.editor;

registerBlockType( "customgutenbergblock/controls", {
	title: __("Controls", "customgutenbergblock"),
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
	category: 'common',
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		alignment: {
			type: 'string',
			default: 'none',
		},
	},
	edit: ( props ) => {
		const {
			attributes: {
				content,
				alignment,
			},
			className,
		} = props;

		const onChangeContent = ( newContent ) => {
			props.setAttributes( { content: newContent } );
		};

		const onChangeAlignment = ( newAlignment ) => {
			props.setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } );
		};

		return (
			<div>
				{
					<BlockControls>
						<AlignmentToolbar
							value={ alignment }
							onChange={ onChangeAlignment }
						/>
					</BlockControls>
				}
				<RichText
					className={ className }
					style={ { textAlign: alignment } }
					tagName="p"
					onChange={ onChangeContent }
					value={ content }
				/>
			</div>
		);
	},
	save: ( props ) => {
		return (
			<RichText.Content
				className={ `customgutenbergblock-align-${ props.attributes.alignment }` }
				tagName="p"
				value={ props.attributes.content }
			/>
		);
	},
} );