export const adsenseConfig = {
    client: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID || '',
    enabled: process.env.NEXT_PUBLIC_ENABLE_ADS === 'true',
    slots: {
      responsive: {
        home: 'YOUR_AD_SLOT_ID_HERE',
        category: 'YOUR_AD_SLOT_ID_HERE',
        toolPage: 'YOUR_AD_SLOT_ID_HERE',
      },
      sidebarFixed: 'YOUR_AD_SLOT_ID_HERE',
      inContentFixed: 'YOUR_AD_SLOT_ID_HERE',
    },
  };
  
  