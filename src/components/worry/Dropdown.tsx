import Image from 'next/image'
import { AllMbtiTypes, mbtiTypes as basicMbtiTypes } from '@/types/mbtiTypes'

export type DropdownProps = {
  selectedType: string
  showDropdown: boolean
  onToggleDropdown: () => void
  onSelectType: (type: string) => void
  isAllTypes?: boolean
}

const Dropdown = ({
  selectedType,
  showDropdown,
  onToggleDropdown,
  onSelectType,
  isAllTypes,
}: DropdownProps) => {
  const types = isAllTypes ? AllMbtiTypes : basicMbtiTypes

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="flex items-center border border-gray4 text-gray2 gap-2 px-2 py-1 rounded-2.5 whitespace-nowrap"
        onClick={onToggleDropdown}
      >
        {selectedType}
        <Image
          src="/images/worry/arrow_bottom.svg"
          alt="arrow_bottom"
          width={10}
          height={7}
        />
      </button>

      {showDropdown && (
        <div className="absolute bg-white border border-gray4 rounded-3.75 p-5 mt-2 z-10 min-w-max">
          <div className="grid grid-cols-5 gap-4">
            {types.map((type) => (
              <button
                key={type}
                type="button"
                className="text-gray2 text-footnote px-2"
                onClick={() => onSelectType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

Dropdown.defaultProps = {
  isAllTypes: true,
}

export default Dropdown
