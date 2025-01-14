const styles = {
  selectInputProps: (color, bgColor) => ({
    fullWidth: true,
    sx: {
      '& .MuiSelect-select': {
        div: {
          columnGap: 1,
        },
      },
      '& .MuiOutlinedInput': {
        border: 'none',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiSvgIcon-root': {
        color: '#AC92FF',
      },
      width: '100%',
      whiteSpace: 'wrap',
      px: 1.5,
      background: bgColor,
      fontSize: { laptop: '14px', desktopMedium: '16px' },
      borderRadius: '15px',
      color: '#AC92FF',
      height: '50px',
      mt: 1,
      fieldset: {
        borderColor: (theme) =>
          `${theme.palette.Common.Black['100p']} !important`,
      },
      '& input::placeholder': {
        fontStyle: 'italic',
        color: (theme) => theme.palette.Background.gray,
      },
      '& input::-webkit-input-placeholder': {
        fontStyle: 'italic',
        color: (theme) => theme.palette.Background.gray,
      },
      notched: false,
    },
  }),
  helperTextProps: (isDescription) => ({
    sx: {
      hidden: !isDescription,
      display: 'inline-block',
      lineHeight: '20px',
      fontFamily: 'Satoshi Regular',
      fontSize: { laptop: '12px', desktop: '14px' },
      color: (theme) => theme.palette.Background.white,
      textAlign: 'left',
      width: '100%',
      mb: '10px',
    },
  }),
  iconProps: {
    sx: { color: (theme) => theme.palette.Background.gray, fontSize: '45px' },
  },
  placeholderProps: {
    fontStyle: 'italic',
    color: (theme) => theme.palette.Background.gray,
    fontFamily: 'Satoshi Bold',
    sx: {
      opacity: 0.5,
    },
  },
  chipProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '16px',
    sx: {
      color: 'black',
      background: 'grey',
    },
  },
  chipGroupProps: {
    container: true,
    item: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 1,
  },
  labelGridProps: {
    container: true,
    mobileSmall: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 1,
    color: (theme) => theme.palette.Common.White['100p'],
    ml: 2,
    sx: {
      transform: 'scale(0.75)',
      transformOrigin: 'left',
      '.MuiTypography-root': {
        fontSize: { laptop: '18px', desktop: '20px' },
      },
    },
  },
  labelProps: (error) => ({
    color: (theme) => (error ? theme.palette.error.main : 'inherit'),
    fontSize: { laptop: '24px', desktop: '26px' },
    fontFamily: 'Satoshi Bold',
  }),
  inputGridProps: {
    container: true,
  },
  fieldContainerProps: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  inputLabelProps: {
    shrink: true,
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
  },
  inputProps: {
    style: {
      borderRadius: '4px',
      borderColor: '#ccc',
      background: 'red',
    },
  },
  uploadButtonProps: {
    variant: 'contained',
    component: 'span',
    style: {
      whiteSpace: 'nowrap',
      height: '45px',
    },
  },
  orLabelProps: {
    style: {
      padding: '0 10px',
    },
  },
  outlinedButtonProps: {
    color: 'purple',
    extraProps: {
      padding: '2px',
      height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
      borderRadius: '8px',
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
      px: { laptop: 1, desktop: 2, desktopMedium: 3 },
      color: '#AC92FF !important',
      borderRadius: '6px',
    },
  },
};

export default styles;
