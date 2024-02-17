import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useRef, useState} from "react";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {updateUserInfoThunk} from "../../service/actions/thunkAction";
import {RootState} from "@reduxjs/toolkit/query";

export default function ProfileForm() {
    const [valueName, setValueName] = useState('');
    const [valueEmail, setValueEmail] = useState('');
    const [valuePass, setValuePass] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [visionButton, setVisionButton] = useState(false);
    const inputRef = useRef(null);
    const store = useSelector(store => store.user.user);
    const dispatch = useDispatch();
    const onIconClick = () => {
        setDisabled(false);
        setTimeout(() => inputRef.current.focus(), 0)
    }
    const onButtonClick = () => {
        dispatch(updateUserInfoThunk({valueName, valueEmail, valuePass}));
        setVisionButton(false);
    }
    useEffect(() => {
        setValueName(store.user.name);
        setValueEmail(store.user.email);
    }, [])
    return (
        <>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => {
                    setVisionButton(true);
                    setValueName(e.target.value)
                }}
                icon={'EditIcon'}
                value={valueName}
                name={'Имя'}
                error={false}
                onIconClick={e => onIconClick(e)}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
                ref={inputRef}
                disabled={disabled}
            />
            <EmailInput
                onChange={e => {
                    setVisionButton(true);
                    setValueEmail(e.target.value)
                }}
                value={valueEmail}
                name={'email'}
                placeholder="Логин"
                isIcon={true}
                extraClass="mb-2"

            />
            <PasswordInput
                onChange={e => {
                    setVisionButton(true);
                    setValuePass(e.target.value)
                }}
                value={valuePass}
                name={'password'}
                icon="EditIcon"
            />
            {visionButton && <div>
                <Button value={'Сохранить'} htmlType="button" type="primary" size="small" extraClass="ml-2"
                        onClick={(e) => {
                            onButtonClick(e)
                        }}>
                    Сохранить
                </Button>
                <Button value={'Отменить'} htmlType="button" type="primary" size="small" extraClass="ml-2"
                        onClick={(e) => {
                            setVisionButton(false);
                        }}>
                    Отменить
                </Button>
            </div>}
        </>
    )
}