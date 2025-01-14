const styles = {
  chatHistoryText: {
    sx: {
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: '5px 0',
      cursor: 'pointer',
    },
  },
  chatHistoryTextCurrent: {
    sx: {
      color: 'rgba(115,80,255,255)',
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: '5px 0',
      cursor: 'pointer',
    },
  },
  centerChatMessage: {
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    sx: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
      color: '#FFFFFF',
    },
  },
  chatHistoriesGrid: {
    sx: {
      width: '100%',
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '0px',
      gap: '12px',
      flex: 'none',
      order: '1',
      alignSelf: 'stretch',
      flexGrow: '0',
    },
  },
  chatHistoryCategorizedContainer: {
    sx: {
      padding: '0 20px',
      width: '100%',
    },
  },
  categoryTitle: {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '4px',
      gap: '12px',
      flex: 'none',
      order: '0',
      alignSelf: 'stretch',
      flexGrow: '0',
    },
  },
  categoryTitleText: {
    sx: {
      fontFamily: 'Satoshi Medium',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '12px',
      lineHeight: '140%',
      letterSpacing: '0.2px',
      color: '#9E94A5',
      flex: 'none',
      order: '0',
      flexGrow: '0',
    },
  },
  chatHistoryTitle: {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '4px',
      gap: '12px',
      flex: 'none',
      order: '1',
      alignSelf: 'stretch',
      flexGrow: '0',
    },
  },
  chatHistoryTitleText: (selected) => ({
    sx: {
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      cursor: 'pointer',
      fontFamily: 'Satoshi Medium',
      fontStyle: 'normal',
      fontSize: '14px',
      lineHeight: '140%',
      letterSpacing: '0.2px',
      color: selected ? '#AC92FF' : '#FFFFFF',
      flex: 'none',
      order: '0',
      flexGrow: '0',
    },
  }),
  underline: {
    sx: {
      width: '100%',
      border: '1px solid #2C3039',
      flex: 'none',
      alignSelf: 'stretch',
      flexGrow: '0',
    },
  },
};

export default styles;
