// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { Event } from "../../data/event";
import Text from "../../components/Text";
import {
  blackColor,
  eucalyptusGreenColor,
  lightNavyBlueColor
} from "../../constants/colors";
import text from "../../constants/text";
import ContentPadding from "../../components/ContentPadding";
import Header from "./Header";
import CategoriesFilterList from "../../components/CategoriesFilterList";

const locale = "en-GB";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: Event[],
  stagedCategories: Set<string>,
  toggleCategoryFilter: Function,
  onApplyFilters: Function,
  onClearAll: Function,
  onClose: Function
};

class CategoriesFilterScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };

  static defaultProps = {
    toggleCategoryFilter: () => {},
    onApplyFilters: () => {},
    onClearAll: () => {},
    onClose: () => {}
  };

  handleClose = () => {
    this.props.onClose();
    this.props.navigation.goBack();
  };

  handleClearAll = () => {
    this.props.onClearAll();
  };

  handleApplyFilters = () => {
    this.props.onApplyFilters();
    this.props.navigation.pop();
  };

  handleFilterChange = (categoryLabel: string) => {
    this.props.toggleCategoryFilter(this.props.stagedCategories, categoryLabel);
  };

  render() {
    const { events, stagedCategories } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ContentPadding style={styles.header}>
          <Header onClose={this.handleClose} onClearAll={this.handleClearAll} />
        </ContentPadding>
        <View style={styles.list}>
          <CategoriesFilterList
            locale={locale}
            stagedCategories={stagedCategories}
            onPress={this.handleFilterChange}
          />
        </View>
        <ContentPadding style={styles.footer}>
          <View>
            <TouchableOpacity
              style={styles.showEventsButton}
              onPress={this.handleApplyFilters}
            >
              <Text type="h2" style={styles.showEventsText}>
                {text.showEvents(events.length)}
              </Text>
            </TouchableOpacity>
          </View>
        </ContentPadding>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: lightNavyBlueColor
  },
  header: {
    borderWidth: 0,
    // The below properties are required for ioS shadow
    shadowColor: blackColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    // The below properties are required for android shadow
    backgroundColor: lightNavyBlueColor,
    elevation: 15
  },
  list: {
    backgroundColor: eucalyptusGreenColor,
    flex: 1
  },
  footer: {
    // The below properties are required for ioS shadow
    shadowColor: blackColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    // The below properties are required for android shadow
    backgroundColor: lightNavyBlueColor,
    elevation: 30
  },
  showEventsButton: {
    backgroundColor: eucalyptusGreenColor,
    width: "100%",
    paddingTop: 13,
    paddingBottom: 11,
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 16
  },
  showEventsText: {
    color: lightNavyBlueColor,
    textAlign: "center"
  }
});

export default CategoriesFilterScreen;
