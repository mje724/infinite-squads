'use client';

import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';

export default function NativeBridge() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    document.documentElement.dataset.native = Capacitor.getPlatform();
    StatusBar.setStyle({ style: Style.Light }).catch(() => undefined);

    const handleTap = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('button, [role="button"]')) {
        Haptics.impact({ style: ImpactStyle.Light }).catch(() => undefined);
      }
    };
    document.addEventListener('pointerup', handleTap, { passive: true });

    const deepLinkListener = App.addListener('appUrlOpen', ({ url }) => {
      try {
        const incoming = new URL(url);
        if (incoming.pathname.startsWith('/auth/callback')) {
          window.location.assign(`/auth/callback?${incoming.searchParams.toString()}`);
        }
      } catch {
        // Ignore malformed external links.
      }
    });

    return () => {
      document.removeEventListener('pointerup', handleTap);
      deepLinkListener.then((listener) => listener.remove());
    };
  }, []);

  return null;
}
