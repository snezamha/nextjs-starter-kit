'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { locales } from '@/config/locales';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Locale } from '@/types/translations';
import { protectedScopes } from '@/config/protected-scopes';

type TranslationsMap = {
  [locale in Locale]: Record<string, string>;
};

function SkeletonLoader() {
  return (
    <div className='flex flex-col items-center gap-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className='flex w-full flex-col gap-2 rounded-md border p-3'
        >
          <Skeleton className='h-4 w-1/3' />
          <Skeleton className='h-8 w-full' />
          <div className='flex justify-end'>
            <Skeleton className='h-8 w-16' />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TranslationsForm() {
  const t = useTranslations('translationsManagement');
  const { toast } = useToast();
  const defaultLocale = useLocale();
  const [locale, setLocale] = useState(defaultLocale);
  const [availableScopes, setAvailableScopes] = useState<string[]>([]);
  const [scope, setScope] = useState<string>('');
  const [translationsMap, setTranslationsMap] = useState<TranslationsMap>(
    () => {
      const empty: Partial<TranslationsMap> = {};
      locales.forEach((l) => {
        empty[l] = {};
      });
      return empty as TranslationsMap;
    }
  );
  const [loading, setLoading] = useState(false);

  const [openAddScopeModal, setOpenAddScopeModal] = useState(false);
  const [newScopeName, setNewScopeName] = useState('');

  const [openAddKeyModal, setOpenAddKeyModal] = useState(false);
  const [localeForNewKey, setLocaleForNewKey] = useState<Locale | null>(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [openDeleteScopeModal, setOpenDeleteScopeModal] = useState(false);

  useEffect(() => {
    async function loadScopes() {
      try {
        const res = await fetch('/api/translations/scopes');
        if (!res.ok) throw new Error('Error fetching scopes');
        const data = await res.json();
        setAvailableScopes(data);
        if (data.length > 0) {
          setScope(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadScopes();
  }, []);

  useEffect(() => {
    if (!scope) return;
    setLoading(true);

    async function loadAllTranslations() {
      try {
        const promises = locales.map(async (locale) => {
          const res = await fetch(`/api/translations/messages/${locale}`);
          if (!res.ok)
            throw new Error('Error fetching translations for ' + locale);
          const data = await res.json();
          return {
            locale,
            scopeTranslations: data[scope] || {}
          };
        });

        const results = await Promise.all(promises);

        setTranslationsMap((prev) => {
          const newMap = { ...prev };
          for (const { locale, scopeTranslations } of results) {
            newMap[locale] = scopeTranslations;
          }
          return newMap;
        });
      } catch (error) {
        console.error('Error loading translations:', error);
      } finally {
        setLoading(false);
      }
    }

    loadAllTranslations();
  }, [scope]);

  const openNewScopeModal = () => {
    setNewScopeName('');
    setOpenAddScopeModal(true);
  };

  const handleConfirmNewScope = () => {
    if (!newScopeName) return;
    if (!availableScopes.includes(newScopeName)) {
      setAvailableScopes((prev) => [...prev, newScopeName]);
      setScope(newScopeName);
    }
    setOpenAddScopeModal(false);
  };

  const handleDeleteScopeClick = () => {
    if (protectedScopes.includes(scope)) {
      toast({
        description:
          t('protectedScopeMessage') ||
          'This scope is protected and cannot be deleted.',
        variant: 'destructive'
      });
      return;
    }
    setOpenDeleteScopeModal(true);
  };

  const handleConfirmDeleteScope = async () => {
    if (!scope) return;
    try {
      const res = await fetch(`/api/translations/scopes?scope=${scope}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error('Failed to delete scope');
      }

      setAvailableScopes((prev) => {
        const filtered = prev.filter((s) => s !== scope);
        if (filtered.length > 0) {
          setScope(filtered[0]);
        } else {
          setScope('');
        }
        return filtered;
      });

      setTranslationsMap((prev) => {
        const newMap = { ...prev };
        locales.forEach((l) => {
          newMap[l] = {};
        });
        return newMap;
      });
    } catch (error) {
      console.error('Error deleting scope:', error);
    } finally {
      setOpenDeleteScopeModal(false);
    }
  };

  const handleTranslationChange = (
    locale: Locale,
    key: string,
    value: string
  ) => {
    setTranslationsMap((prev) => ({
      ...prev,
      [locale]: {
        ...prev[locale],
        [key]: value
      }
    }));
  };

  const openNewKeyModal = (locale: Locale) => {
    setLocaleForNewKey(locale);
    setNewKeyName('');
    setOpenAddKeyModal(true);
  };

  const handleConfirmNewKey = () => {
    if (!localeForNewKey || !newKeyName) {
      setOpenAddKeyModal(false);
      return;
    }
    setTranslationsMap((prev) => {
      const newMap = { ...prev };
      newMap[localeForNewKey] = {
        ...newMap[localeForNewKey],
        [newKeyName]: ''
      };
      return newMap;
    });
    setOpenAddKeyModal(false);
  };

  const handleDeleteKey = (locale: Locale, key: string) => {
    if (protectedScopes.includes(scope)) {
      toast({
        description:
          t('protectedScopeKeyMessage') ||
          'This key belongs to a protected scope and cannot be deleted.',
        variant: 'destructive'
      });
      return;
    }
    setTranslationsMap((prev) => {
      const newMap = { ...prev };
      delete newMap[locale][key];
      return newMap;
    });
  };

  const handleSaveAll = async (e: FormEvent) => {
    e.preventDefault();
    if (!scope) {
      toast({
        description: t('invalidScope'),
        variant: 'destructive'
      });
      return;
    }

    let allSuccess = true;

    for (const lang of locales) {
      const translationsToSave = translationsMap[lang] || {};
      const res = await fetch('/api/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale: lang,
          scope,
          translations: translationsToSave
        })
      });

      if (!res.ok) {
        allSuccess = false;
      }
    }

    if (allSuccess) {
      toast({
        description: t('translationsSaved'),
        variant: 'default'
      });
    } else {
      toast({
        description: t('translationsSaveError'),
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteScopeModal}
        onOpenChange={setOpenDeleteScopeModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-start'>{t('deleteScope')}</DialogTitle>
            <DialogDescription className='text-start'>
              {t('deleteScopeConfirmation', { scope })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='destructive' onClick={handleConfirmDeleteScope}>
              {t('confirm')}
            </Button>
            <Button
              variant='secondary'
              onClick={() => setOpenDeleteScopeModal(false)}
            >
              {t('cancel')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openAddScopeModal} onOpenChange={setOpenAddScopeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-start'>{t('addScope')}</DialogTitle>
            <DialogDescription className='text-start'>
              {t('enterNewScopeName')}
            </DialogDescription>
          </DialogHeader>
          <div className='my-2'>
            <Input
              value={newScopeName}
              onChange={(e) => setNewScopeName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleConfirmNewScope}>{t('confirm')}</Button>
            <Button
              variant='secondary'
              onClick={() => setOpenAddScopeModal(false)}
            >
              {t('cancel')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openAddKeyModal} onOpenChange={setOpenAddKeyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-start'>
              {t('addKeyFor', {
                language:
                  localeForNewKey === 'fa'
                    ? t('faLabel')
                    : localeForNewKey === 'en'
                      ? t('enLabel')
                      : t('deLabel')
              })}
            </DialogTitle>
            <DialogDescription className='text-start'>
              {t('enterNewKeyForLocale', { locale: localeForNewKey })}
            </DialogDescription>
          </DialogHeader>
          <div className='my-2'>
            <Input
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleConfirmNewKey}>{t('confirm')}</Button>
            <Button
              variant='secondary'
              onClick={() => setOpenAddKeyModal(false)}
            >
              {t('cancel')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className='flex flex-col gap-3'>
        <Label className='text-start'>{t('scopeLabel')}</Label>
        <Select
          value={scope}
          onValueChange={(val) => setScope(val)}
          disabled={!availableScopes.length}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('scopePlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {availableScopes.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className='mt-2 flex flex-wrap justify-between gap-2'>
          <Button variant='default' onClick={openNewScopeModal}>
            {t('addScope')}
          </Button>
          <Button variant='destructive' onClick={handleDeleteScopeClick}>
            {t('deleteScope')}
          </Button>
        </div>
      </div>

      <Separator className='my-4' />

      {scope ? (
        loading ? (
          <SkeletonLoader />
        ) : (
          <form onSubmit={handleSaveAll}>
            <Tabs
              defaultValue={locale}
              onValueChange={(value) => setLocale(value)}
            >
              <TabsList className='mb-4 flex justify-center'>
                {locales.map((lang) => (
                  <TabsTrigger key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </TabsTrigger>
                ))}
              </TabsList>
              {locales.map((locale) => (
                <TabsContent key={locale} value={locale}>
                  <div className='mb-3 flex justify-center'>
                    <Button
                      type='button'
                      onClick={() => openNewKeyModal(locale)}
                      className='w-auto max-w-full whitespace-nowrap px-4 py-2 text-xs'
                    >
                      {t('addKeyFor', {
                        language:
                          locale === 'fa'
                            ? t('faLabel')
                            : locale === 'en'
                              ? t('enLabel')
                              : t('deLabel')
                      })}
                    </Button>
                  </div>
                  <ScrollArea className='h-[70vh] rounded-md border p-2'>
                    <div className='flex flex-col items-center gap-2'>
                      {Object.entries(translationsMap[locale] || {}).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className='flex w-full flex-col gap-2 rounded-md border p-3'
                          >
                            <Label className='text-sm'>{key}:</Label>
                            <Input
                              value={value}
                              onChange={(e) =>
                                handleTranslationChange(
                                  locale,
                                  key,
                                  e.target.value
                                )
                              }
                              className='text-start'
                            />
                            <div className='flex justify-end'>
                              <Button
                                type='button'
                                variant='destructive'
                                size='sm'
                                onClick={() => handleDeleteKey(locale, key)}
                              >
                                {t('deleteKey')}
                              </Button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
            <div className='mt-4 flex justify-end'>
              <Button type='submit' variant='default' className='px-6'>
                {t('save')}
              </Button>
            </div>
          </form>
        )
      ) : (
        <p className='text-start'>{t('noScope')}</p>
      )}
    </>
  );
}
