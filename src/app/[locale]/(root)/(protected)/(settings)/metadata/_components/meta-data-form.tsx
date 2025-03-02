'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { siteSettings } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { locales } from '@/config/locales';
import { useToast } from '@/hooks/use-toast';

export default function MetaDataForm() {
  const t = useTranslations('metaData');
  const { toast } = useToast();

  const defaultLocale = useLocale() as keyof typeof siteSettings;
  const [locale, setLocale] =
    useState<keyof typeof siteSettings>(defaultLocale);
  const [settings, setSettings] = useState(
    siteSettings[locale] ?? {
      metadata: {
        title: '',
        description: '',
        keywords: [],
        authors: [{ name: '', url: '' }]
      }
    }
  );

  useEffect(() => {
    setSettings(
      siteSettings[locale] ?? {
        metadata: {
          title: '',
          description: '',
          keywords: [],
          authors: [{ name: '', url: '' }]
        }
      }
    );
  }, [locale]);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ locale, settings })
      });

      if (response.ok) {
        toast({
          description: t('metaDataUpdatedFor', {
            locale:
              locale === 'fa'
                ? t('faLabel')
                : locale === 'en'
                  ? t('enLabel')
                  : t('deLabel')
          }),
          variant: 'default'
        });
      } else {
        toast({ description: t('saveFailed'), variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({ description: t('saveFailed'), variant: 'destructive' });
    }
  };

  return (
    <>
      <Tabs
        defaultValue={locale}
        onValueChange={(value) => setLocale(value as keyof typeof siteSettings)}
      >
        <TabsList className='mb-4 flex justify-center'>
          {locales.map((lang) => (
            <TabsTrigger key={lang} value={lang}>
              {lang.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className='mb-4'>
        <Label className='mb-2 block font-medium'>{t('metaTitle')}</Label>
        <Input
          value={settings.metadata.title}
          onChange={(e) =>
            setSettings({
              ...settings,
              metadata: { ...settings.metadata, title: e.target.value }
            })
          }
          className='w-full'
        />
      </div>

      <div className='mb-4'>
        <Label className='mb-2 block font-medium'>{t('metaDescription')}</Label>
        <Textarea
          value={settings.metadata.description}
          onChange={(e) =>
            setSettings({
              ...settings,
              metadata: { ...settings.metadata, description: e.target.value }
            })
          }
          className='w-full'
        />
      </div>

      <div className='mb-4'>
        <Label className='mb-2 block font-medium'>{t('keywords')}</Label>
        <Input
          value={settings.metadata.keywords.join(', ')}
          onChange={(e) =>
            setSettings({
              ...settings,
              metadata: {
                ...settings.metadata,
                keywords: e.target.value.split(', ')
              }
            })
          }
          className='w-full'
        />
      </div>

      <div className='mb-4'>
        <Label className='mb-2 block font-medium'>{t('authorName')}</Label>
        <Input
          value={settings.metadata.authors[0]?.name || ''}
          onChange={(e) =>
            setSettings({
              ...settings,
              metadata: {
                ...settings.metadata,
                authors: [
                  {
                    name: e.target.value,
                    url: settings.metadata.authors[0]?.url || ''
                  }
                ]
              }
            })
          }
          className='w-full'
        />
      </div>

      <div className='mb-4'>
        <Label className='mb-2 block font-medium'>{t('authorUrl')}</Label>
        <Input
          value={settings.metadata.authors[0]?.url || ''}
          onChange={(e) =>
            setSettings({
              ...settings,
              metadata: {
                ...settings.metadata,
                authors: [
                  {
                    name: settings.metadata.authors[0]?.name || '',
                    url: e.target.value
                  }
                ]
              }
            })
          }
          className='w-full'
        />
      </div>

      <div className='mt-4 flex justify-end'>
        <Button onClick={handleSave} variant='default' className='px-6'>
          {t('saveChanges')}
        </Button>
      </div>
    </>
  );
}
