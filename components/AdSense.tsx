'use client'

import { useEffect } from 'react'
import { adsenseConfig } from '@/lib/adsense-config'

interface AdSenseProps {
  slot: string
  style?: React.CSSProperties
  format?: 'auto' | 'fluid'
  layout?: string
  responsive?: boolean
}

export function AdSense({ slot, style, format = 'auto', layout, responsive = true }: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  if (!adsenseConfig.enabled) {
    return null;
  }

  return (
    <ins
      className="adsbygoogle"
      style={style || { display: 'block' }}
      data-ad-client={adsenseConfig.client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      {...(layout && { 'data-ad-layout': layout })}
    />
  );
}

