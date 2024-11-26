'use client'

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { FaceFrownIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const items = [
  { id: 1, name: 'Workflow Inc.', category: 'Clients', url: '#' },
  // More items...
]

interface SearchComponentProps {
  open: boolean
  onClose: () => void
}

export default function SearchComponent({ open, onClose }: SearchComponentProps) {
  const [query, setQuery] = useState('')

  const filteredItems =
    query === ''
      ? []
      : items.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase())
        })

  const groups = filteredItems.reduce((groups: { [key: string]: typeof items }, item) => {
    return { ...groups, [item.category]: [...(groups[item.category] || []), item] }
  }, {} as { [key: string]: typeof items })

  return (
    <Dialog
      transition
      className="relative z-50"
      open={open}
      onClose={() => {
        onClose()
        setQuery('')
      }}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20 pt-20">
        <DialogPanel
          transition
          className="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
        >
          <Combobox
            onChange={(item: { id: number; name: string; category: string; url: string }) => {
              if (item) {
                window.location.href = item.url
              }
            }}
          >
            <div className="relative">
              <MagnifyingGlassIcon
                className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <ComboboxInput
                autoFocus
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                onChange={(event) => setQuery(event.target.value)}
                onBlur={() => setQuery('')}
              />
            </div>

            {query === '' && (
              <div className="border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14">
                <GlobeAmericasIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                <p className="mt-4 font-semibold text-gray-900">Tìm kiếm sản phẩm</p>
                <p className="mt-2 text-gray-500">Truy cập nhanh vào sản phẩm bằng cách chạy tìm kiếm toàn cầu.</p>
              </div>
            )}

            {filteredItems.length > 0 && (
              <ComboboxOptions
                static
                as="ul"
                className="max-h-80 scroll-pb-2 scroll-pt-11 space-y-2 overflow-y-auto pb-2"
              >
                {Object.entries(groups).map(([category, items]) => (
                  <li key={category}>
                    <h2 className="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">{category}</h2>
                    <ul className="mt-2 text-sm text-gray-800">
                      {items.map((item) => (
                        <ComboboxOption
                          key={item.id}
                          value={item}
                          className="cursor-default select-none px-4 py-2 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                        >
                          {item.name}
                        </ComboboxOption>
                      ))}
                    </ul>
                  </li>
                ))}
              </ComboboxOptions>
            )}

            {query !== '' && filteredItems.length === 0 && (
              <div className="border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14">
                <FaceFrownIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                <p className="mt-4 font-semibold text-gray-900">Không tìm thấy kết quả nào</p>
                <p className="mt-2 text-gray-500">Chúng tôi không thể tìm thấy bất cứ điều gì với thuật ngữ đó. Vui lòng thử lại.</p>
              </div>
            )}
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
