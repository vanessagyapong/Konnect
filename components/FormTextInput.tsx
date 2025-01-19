import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps, HelperText } from 'react-native-paper';
import { View } from 'react-native';
import { TextInput as RNTextInput } from 'react-native';

export interface FormTextInputProps extends TextInputProps {
  nextInputRef?: React.RefObject<RNTextInput>;
  isPassword?: boolean;
  helperText?: string;
}

export const FormTextInput = forwardRef<RNTextInput, FormTextInputProps>(
  ({ nextInputRef, isPassword, helperText, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <View>
        <TextInput
          ref={ref}
          mode="outlined"
          returnKeyType={nextInputRef ? "next" : props.returnKeyType}
          onSubmitEditing={() => {
            if (nextInputRef?.current) {
              nextInputRef.current.focus();
            }
          }}
          secureTextEntry={isPassword && !showPassword}
          right={
            isPassword ? (
              <TextInput.Icon 
                icon={showPassword ? "eye-off" : "eye"} 
                onPress={() => setShowPassword(!showPassword)}
              />
            ) : undefined
          }
          {...props}
        />
        {helperText && (
          <HelperText type="info">
            {helperText}
          </HelperText>
        )}
      </View>
    );
  }
); 