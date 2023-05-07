import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'var(--borders )',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'var(--borders )',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      letterSpacing:"1px"
      // borderColor: 'red',
    },
    '&:hover fieldset': {
      // borderColor: 'green',
    },
    '&.Mui-focused fieldset': {
      // borderColor: 'green',
    },
  },
});

export default function Styled_Standard_Textfield(props) {
  return (
    <CssTextField {...props} />
  );
}