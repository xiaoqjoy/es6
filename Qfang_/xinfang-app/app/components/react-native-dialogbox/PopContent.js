'use strict';

import React, { PureComponent, PropTypes } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform, PixelRatio } from 'react-native';
import styleShape from './style-shape';
import makeStyleProxy from './make-stylesheet';

export default class PopContent extends PureComponent {

	static propTypes = {
		title: PropTypes.string,
		btns: PropTypes.arrayOf(PropTypes.shape({
			text: PropTypes.string.isRequired,
			style: PropTypes.object,
			callback: PropTypes.func,
		})),
		style: PropTypes.shape(styleShape),
		buttonFlow: PropTypes.oneOf(['auto', 'column', 'row']),
	};

	static defaultProps = {
		buttonFlow: 'auto',
		style: {},
	}

	render() {
		const { title, content, btns, style } = this.props;
		const styleSheet = makeStyleProxy(style, Dimensions, Platform, PixelRatio)();
		const buttonFlowAuto = this.props.buttonFlow.toLowerCase() === 'auto';
		const buttonFlowColumn = buttonFlowAuto ? btns.length !== 1 ? true : false : this.props.buttonFlow.toLowerCase() === 'column';
		const btnNumber = btns.length;
		const btnContent = [];
		Array.prototype.forEach.call(btns, (btn, index) => {
			btnContent.push(
				<TouchableOpacity style={buttonFlowColumn ? styleSheet.btnTextBoxMulti : styleSheet.btnTextBox} onPress={btn.callback} key={`btnTextBox${index}`}>
					<Text style={[buttonFlowColumn ? styleSheet.btnTextTextBoxMulti : styleSheet.btnText, btn.style]}>{btn.text}</Text>
				</TouchableOpacity>
			);
			index !== btnNumber - 1 && btnContent.push(<View style={buttonFlowColumn ? styleSheet.btnLineHorizontal : styleSheet.btnLineVertical} key={`btnLine${index}`} />);
		});

		return (
			<View style={[styleSheet.tipBox,{width: '100%'}]}>
				{title && <View style={styleSheet.tipTitleBox}><Text style={styleSheet.tipTitle}>{title}</Text></View>}
				<View style={[styleSheet.tipContentBox,{width: '100%'}]}>
					{(() => {
						let typeString = Object.prototype.toString.call(content).slice(8,-1);
						if(typeString == 'Object') {
							return content;
						} else if(typeString === 'Array') {
							let tipContent = [];
							if (content instanceof Array) {
								content.forEach((item, index, arr) => {
									if (index > 9) {
										return;
									}
									item && (tipContent[index] = (<Text style={styleSheet.tipContent} key={`tipContent${index}`}>{item}</Text>));
								});
							} else {
								content && (tipContent[0] = (<Text style={styleSheet.tipContent} key={'tipContent'}>{content}</Text>));
							}

							return tipContent;
						}
					})()}
				</View>
				<View style={styleSheet.line}></View>
				<View style={buttonFlowColumn ? styleSheet.btnBoxMulti : styleSheet.btnBox}>
					{btnContent}
				</View>
			</View>
		);
	}

};
