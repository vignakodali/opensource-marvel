const styles = {
  inputProps: (
    error,
    isPasswordField,
    setFieldType,
    renderPrimaryIcon,
    renderVisibilityIcon,
    state
  ) => ({
    notched: false,
    color: state,
    error,
    autoComplete: 'off',
    startAdornment: renderPrimaryIcon(),
    type: setFieldType(),
    endAdornment: isPasswordField && renderVisibilityIcon(),
    sx: () => ({
      'label + &': {
        marginTop: 2,
      },
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '16px', desktopMedium: '18px' },
      height: { laptop: '54px', desktopMedium: '60px' },
      borderRadius: '999px',
      background: 'transparent',
      color: '#D7D7D7',
      px: 4,
      fieldset: {
        border: '2px solid #D7D7D7',
      },
    }),
  }),
  inputLabelProps: (error, state) => ({
    error,
    color: state,
    shrink: true,
    sx: {
      marginLeft: '.5rem',
      top: '-8px',
      fontSize: { laptop: '16px', desktopMedium: '18px' },
      fontFamily: 'Satoshi Bold',
    },
  }),
  inputPrimaryIcon: {
    position: 'start',
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: { mobileSmall: '32px', desktopMedium: '36px' },
      width: { mobileSmall: '32px', desktopMedium: '36px' },
      borderRadius: '50%',
      p: 1,
      bgcolor: (theme) => theme.palette.Greyscale[100],
    },
  },
};

export default styles;
