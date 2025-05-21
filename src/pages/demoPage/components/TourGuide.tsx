"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import "./TourGuide.css"

interface TourStep {
  target: string
  title: string
  content: string
  position: "top" | "bottom" | "left" | "right"
}

interface TourGuideProps {
  steps: TourStep[]
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  currentStep: number
  setCurrentStep: (step: number) => void
}

const TourGuide: React.FC<TourGuideProps> = ({ steps, isOpen, onClose, onComplete, currentStep, setCurrentStep }) => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [animationClass, setAnimationClass] = useState("tour-tooltip-enter")
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [isPhoneElement, setIsPhoneElement] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update window size on resize
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Initialize
    updateWindowSize()

    window.addEventListener("resize", updateWindowSize)
    return () => window.removeEventListener("resize", updateWindowSize)
  }, [])

  // Handle scrolling - keep tour elements fixed relative to viewport
  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => {
      if (targetElement) {
        const newRect = targetElement.getBoundingClientRect()
        setTargetRect(newRect)
        positionTooltip(targetElement, steps[currentStep].position)
        positionHighlight(targetElement)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isOpen, targetElement, currentStep, steps])

  useEffect(() => {
    if (!isOpen) return

    const targetEl = document.querySelector(steps[currentStep]?.target) as HTMLElement
    if (targetEl) {
      setTargetElement(targetEl)
      const rect = targetEl.getBoundingClientRect()
      setTargetRect(rect)

      // Check if target is part of the phone container
      const isPhone =
        targetEl.closest(".phone-container") !== null ||
        targetEl.closest(".phone-frame") !== null ||
        targetEl.classList.contains("comment-input-container")
      setIsPhoneElement(isPhone)

      // Small delay to ensure DOM is ready
      setTimeout(() => {
        positionTooltip(targetEl, steps[currentStep].position)
        positionHighlight(targetEl)
      }, 50)

      // Add highlight effect to target element
      targetEl.classList.add("tour-target-element")

      // Scroll to the element if needed
      const isInViewport =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

      if (!isInViewport) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }

    return () => {
      if (targetEl) {
        targetEl.classList.remove("tour-target-element")
      }
    }
  }, [currentStep, isOpen, steps, windowSize])

  // Reposition on window resize
  useEffect(() => {
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect()
      setTargetRect(rect)
      positionTooltip(targetElement, steps[currentStep].position)
      positionHighlight(targetElement)
    }
  }, [windowSize, targetElement, currentStep, steps])

  const positionHighlight = (target: HTMLElement) => {
    if (!highlightRef.current) return

    const rect = target.getBoundingClientRect()

    // Add padding around the element
    const padding = 8
    highlightRef.current.style.top = `${rect.top - padding}px`
    highlightRef.current.style.left = `${rect.left - padding}px`
    highlightRef.current.style.width = `${rect.width + padding * 2}px`
    highlightRef.current.style.height = `${rect.height + padding * 2}px`

    // Apply rounded corners for phone elements
    if (isPhoneElement) {
      highlightRef.current.style.borderRadius = "20px"
    } else {
      highlightRef.current.style.borderRadius = "6px"
    }
  }

  const positionTooltip = (target: HTMLElement, position: string) => {
    if (!tooltipRef.current || !arrowRef.current) return

    const targetRect = target.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const isMobile = window.innerWidth < 768

    // Default gap between tooltip and target - increase for mobile
    const gap = isMobile ? 24 : 16

    // Calculate initial position
    let top = 0
    let left = 0
    let arrowTop = 0
    let arrowLeft = 0
    let arrowStyle = ""

    // For mobile, prefer positioning above or below rather than sides
    const mobilePosition = isMobile ? (targetRect.top > window.innerHeight / 2 ? "top" : "bottom") : position

    switch (mobilePosition) {
      case "top":
        top = targetRect.top - tooltipRect.height - gap
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        arrowStyle = "bottom"
        arrowTop = tooltipRect.height - 2
        arrowLeft = tooltipRect.width / 2 - 8
        break
      case "bottom":
        top = targetRect.bottom + gap
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        arrowStyle = "top"
        arrowTop = -8
        arrowLeft = tooltipRect.width / 2 - 8
        break
      case "left":
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        left = targetRect.left - tooltipRect.width - gap
        arrowStyle = "right"
        arrowTop = tooltipRect.height / 2 - 8
        arrowLeft = tooltipRect.width - 2
        break
      case "right":
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        left = targetRect.right + gap
        arrowStyle = "left"
        arrowTop = tooltipRect.height / 2 - 8
        arrowLeft = -8
        break
    }

    // Adjust if tooltip goes off screen
    const margin = isMobile ? 20 : 16
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // Horizontal adjustment
    if (left < margin) {
      const diff = margin - left
      left = margin

      // Adjust arrow if we're in top or bottom position
      if (mobilePosition === "top" || mobilePosition === "bottom") {
        arrowLeft -= diff
      }
    } else if (left + tooltipRect.width > windowWidth - margin) {
      const diff = left + tooltipRect.width - (windowWidth - margin)
      left = windowWidth - tooltipRect.width - margin

      // Adjust arrow if we're in top or bottom position
      if (mobilePosition === "top" || mobilePosition === "bottom") {
        arrowLeft += diff
      }
    }

    // Vertical adjustment
    if (top < margin) {
      const diff = margin - top
      top = margin

      // Adjust arrow if we're in left or right position
      if (mobilePosition === "left" || mobilePosition === "right") {
        arrowTop -= diff
      }
    } else if (top + tooltipRect.height > windowHeight - margin) {
      const diff = top + tooltipRect.height - (windowHeight - margin)
      top = windowHeight - tooltipRect.height - margin

      // Adjust arrow if we're in left or right position
      if (mobilePosition === "left" || mobilePosition === "right") {
        arrowTop += diff
      }
    }

    // Set positions
    setTooltipPosition({ top, left })

    // Position the arrow
    arrowRef.current.className = `tour-tooltip-arrow tour-arrow-${arrowStyle}`
    arrowRef.current.style.top = `${arrowTop}px`
    arrowRef.current.style.left = `${arrowLeft}px`
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setAnimationClass("tour-tooltip-exit")
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setAnimationClass("tour-tooltip-enter")
      }, 300)
    } else {
      setAnimationClass("tour-tooltip-exit")
      setTimeout(() => {
        onComplete()
      }, 300)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setAnimationClass("tour-tooltip-exit")
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
        setAnimationClass("tour-tooltip-enter")
      }, 300)
    }
  }

  const handleClose = () => {
    setAnimationClass("tour-tooltip-exit")
    setTimeout(() => {
      onClose()
    }, 300)
  }

  if (!isOpen || !steps.length) return null

  return (
    <div className="tour-container" ref={containerRef}>
      <div
        ref={overlayRef}
        className="tour-overlay"
        onClick={(e) => {
          // Only close if clicking directly on the overlay (not on tooltip or highlighted element)
          if (e.target === overlayRef.current) {
            handleClose()
          }
        }}
      />

      {targetRect && (
        <svg className="tour-mask" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="tour-mask">
              <rect width="100%" height="100%" fill="white" />
              <rect
                x={targetRect.left - 8}
                y={targetRect.top - 8}
                width={targetRect.width + 16}
                height={targetRect.height + 16}
                rx={isPhoneElement ? "20" : "4"}
                ry={isPhoneElement ? "20" : "4"}
                fill="black"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.75)"
            mask="url(#tour-mask)"
            style={{ backdropFilter: "blur(2px)" }}
          />
        </svg>
      )}

      <div ref={highlightRef} className={`tour-highlight ${isPhoneElement ? "phone-element" : ""}`} />

      <div
        ref={tooltipRef}
        className={`tour-tooltip ${animationClass} ${windowSize.width < 768 ? "mobile" : ""}`}
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
        }}
      >
        <div ref={arrowRef} className="tour-tooltip-arrow" />

        <div className="tour-tooltip-header">
          <div className="tour-step-indicator">
            <span className="tour-step-number">{currentStep + 1}</span>
            <span className="tour-step-total">/ {steps.length}</span>
          </div>
          <button className="tour-close-button" onClick={handleClose} aria-label="Close tour">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="tour-tooltip-content">
          <h3>{steps[currentStep].title}</h3>
          <p>{steps[currentStep].content}</p>
        </div>

        <div className="tour-tooltip-footer">
          <div className="tour-step-progress">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`tour-step-dot ${index === currentStep ? "active" : ""} ${
                  index < currentStep ? "completed" : ""
                }`}
              />
            ))}
          </div>

          <div className="tour-navigation-buttons">
            <button className="tour-skip-button" onClick={handleClose}>
              Skip
            </button>
            <div className="tour-nav-buttons-group">
              {currentStep > 0 && (
                <button className="tour-prev-button" onClick={handlePrev}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </button>
              )}
              <button className="tour-next-button" onClick={handleNext}>
                {currentStep < steps.length - 1 ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourGuide
