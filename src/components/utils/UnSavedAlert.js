import React, {Component} from 'react';
import {Alert} from 'antd';

class UnSavedAlert extends Component {
    render() {
        return super.render(
            <Alert className="save-changes"
                   description={
                       <span>
                                <span className="notif">
                                    تغییرات شما هنوز ذخیره نشده است. برای ذخیره تغییرات
                                </span>
                                <span className='temp-button' onClick={this.props.onSave}>
اینجا
                                </span>
                        را کلیک کنید.
                            </span>}
                   type="warning"
                   showIcon
            />
        );
    }
}

export default UnSavedAlert;