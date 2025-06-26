import {
  forwardRef,
  TextareaHTMLAttributes,
  useRef,
  useEffect,
} from "react"
import clsx from "clsx"
import styles from "./MyTextArea.module.scss"

interface MyTextareaFormProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  className?: string
}

const MyTextarea = forwardRef<HTMLTextAreaElement, MyTextareaFormProps>(
  ({ label, error, className, id, onChange, value, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null)

    const setRef = (el: HTMLTextAreaElement) => {
      
      if (typeof ref === "function") {
        ref(el)
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el
      }

      internalRef.current = el
    }

    const textareaId =
      id || `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`

    const autoResize = () => {
      const el = internalRef.current
      if (el) {
        el.style.height = "auto"
        el.style.height = `${el.scrollHeight}px`
        console.log("Resized:", el.scrollHeight)
      }
    }

    useEffect(() => {
      autoResize()
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      autoResize()
      onChange?.(e)
    }

    return (
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor={textareaId}>
          {label}
        </label>
        <textarea
          id={textareaId}
          ref={setRef}
          value={value}
          onChange={handleChange}
          className={clsx(styles.textarea, className)}
          {...props}
        />
        {error && <div className={styles.error}>{error}</div>}
      </div>
    )
  }
)

export default MyTextarea
