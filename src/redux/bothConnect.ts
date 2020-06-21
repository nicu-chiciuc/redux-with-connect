import { ComponentType } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { MessageTypes, StoreType } from "./index";

type ObjectWithMessages = { [x: string]: (...data: any[]) => MessageTypes };

type WithConnected<OtherProps> = <TProps extends {} = {}>(
  Component: ComponentType<TProps & OtherProps>
) => ComponentType<TProps>;

type UseConnected<OtherProps> = () => OtherProps;

type BothTypeConnect<OtherProps> = [
  WithConnected<OtherProps>,
  UseConnected<OtherProps>
];

export type ExtractConnect<Something> = Something extends WithConnected<infer R>
  ? R
  : Something extends UseConnected<infer R>
  ? R
  : never;

/**
 * This function works in the same way as the connect() from react-redux
 * but is more strict, knows the type of the store, and also allows to extract it's types very
 * easily using ExtractConnect
 */

// prettier-ignore
export function withConnect<PropsDispatch extends ObjectWithMessages = {}>(mapStateToProps: null, mapDispatchToProps: PropsDispatch): WithConnected<PropsDispatch>;
// prettier-ignore
export function withConnect<PropsFromStore extends {} = {}>(mapStateToProps: (store: StoreType) => PropsFromStore, mapDispatchToProps?: undefined): WithConnected<PropsFromStore>;
// prettier-ignore
export function withConnect<PropsFromStore extends {} = {}, PropsDispatch extends ObjectWithMessages = {}>(mapStateToProps: (store: StoreType) => PropsFromStore, mapDispatchToProps: PropsDispatch): WithConnected<PropsFromStore & PropsDispatch>;

export function withConnect<
  PropsFromStore extends {} = {},
  PropsDispatch extends ObjectWithMessages = {}
>(
  mapStateToProps: null | ((store: StoreType) => PropsFromStore),
  mapDispatchToProps?: PropsDispatch
) {
  return connect(mapStateToProps, mapDispatchToProps);
}

export function useSelect<T extends {} = {}>(
  mapStateToProps: (store: StoreType) => T
): T {
  return useSelector(mapStateToProps);
}

export function useActions<T extends ObjectWithMessages = {}>(actions: T): T {
  const dispatch = useDispatch();

  const boundDispatches = bindActionCreators(actions, dispatch);

  return boundDispatches;
}

// prettier-ignore
export function createUseConnect<PropsDispatch extends ObjectWithMessages = {}>(mapStateToProps: null, mapDispatchToProps: PropsDispatch): UseConnected<PropsDispatch>;
// prettier-ignore
export function createUseConnect<PropsFromStore extends {} = {}>(mapStateToProps: (store: StoreType) => PropsFromStore, mapDispatchToProps?: undefined): UseConnected<PropsFromStore>;
// prettier-ignore
export function createUseConnect<PropsFromStore extends {} = {}, PropsDispatch extends ObjectWithMessages = {}>(mapStateToProps: (store: StoreType) => PropsFromStore, mapDispatchToProps: PropsDispatch): UseConnected<PropsFromStore & PropsDispatch>;

export function createUseConnect<
  PropsFromStore extends {} = {},
  PropsDispatch extends ObjectWithMessages = {}
>(
  mapStateToProps: null | ((store: StoreType) => PropsFromStore),
  mapDispatchToProps?: PropsDispatch
) {
  // This is done for performance reasons so that redux does not rerender the methods that don't care about some stuff

  if (mapStateToProps && mapDispatchToProps) {
    return () => ({
      ...useSelect(mapStateToProps),
      ...useActions(mapDispatchToProps),
    });
  }

  if (mapStateToProps && !mapDispatchToProps) {
    return () => useSelect(mapStateToProps);
  }

  if (mapDispatchToProps && !mapStateToProps) {
    return () => useActions(mapDispatchToProps);
  }

  return () => ({ impossible: 3 });
}

// prettier-ignore
export function bothConnect<PropsDispatch extends ObjectWithMessages = {}>(mapStateToProps: null, mapDispatchToProps: PropsDispatch): BothTypeConnect<PropsDispatch>;
// prettier-ignore
export function bothConnect<PropsFromStore extends {} = {}>(mapStateToProps: (store: StoreType) => PropsFromStore): BothTypeConnect<PropsFromStore>;
// prettier-ignore
export function bothConnect<PropsFromStore extends {} = {}, PropsDispatch extends ObjectWithMessages = {}>(mapStateToProps: (store: StoreType) => PropsFromStore, mapDispatchToProps: PropsDispatch): BothTypeConnect<PropsFromStore & PropsDispatch>;

export function bothConnect<
  PropsFromStore extends {} = {},
  PropsDispatch extends ObjectWithMessages = {}
>(
  mapStateToProps: null | ((store: StoreType) => PropsFromStore),
  mapDispatchToProps?: PropsDispatch
) {
  if (mapStateToProps && mapDispatchToProps) {
    return [
      withConnect(mapStateToProps, mapDispatchToProps),
      createUseConnect(mapStateToProps, mapDispatchToProps),
    ];
  }

  if (mapStateToProps && !mapDispatchToProps) {
    return [
      withConnect(mapStateToProps, mapDispatchToProps),
      createUseConnect(mapStateToProps, mapDispatchToProps),
    ];
  }

  if (mapDispatchToProps && !mapStateToProps) {
    return [
      withConnect(mapStateToProps, mapDispatchToProps),
      createUseConnect(mapStateToProps, mapDispatchToProps),
    ];
  }

  // INFO: Practically the inner functions already check for null/undefined and theoretically it would've been
  // necessary jsut 1 single line of code but Typescript (or me) cannot understand how to handle inner overloaded
  // functions and as such this hacky way was needed

  throw new Error("bothConnect passed both arguments that are null/undefined");
}
