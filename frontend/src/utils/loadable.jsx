import { Suspense, lazy } from "react";
import LoadingState from "../components/LoadingState";

const loadable = (importFunc, height = "h-96") => {
  const LazyComponent = lazy(importFunc);

  const LoadableComponent = (props) => (
    <Suspense
      fallback={
        <div className={`${height} grid w-full place-items-center`}>
          <LoadingState />
        </div>
      }
    >
      <LazyComponent {...props} />
    </Suspense>
  );

  LoadableComponent.displayName = "LoadableComponent";
  return LoadableComponent;
};

export default loadable;
