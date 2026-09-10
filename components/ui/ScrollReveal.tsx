"use client";

import { useEffect } from "react";

/**
 * Wires up every `.reveal` element on the page to a single
 * IntersectionObserver, mounted once here rather than per-section, so any
 * element anywhere in the site picks up the fade-up simply by carrying the
 * class. Runs once on mount; new `.reveal` nodes added later (route changes)
 * are picked up by a MutationObserver watching for them.
 *
 * Elements already in the viewport on first paint are revealed immediately —
 * IntersectionObserver's first callback reports current state, not just
 * future crossings, so there is no flash-of-hidden-content above the fold.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const revealed = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          revealed.add(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    const observe = (root: ParentNode) => {
      root.querySelectorAll(".reveal").forEach((el) => {
        if (!revealed.has(el)) observer.observe(el);
      });
    };

    observe(document);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.matches(".reveal")) observer.observe(node);
            observe(node);
          }
        });
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
