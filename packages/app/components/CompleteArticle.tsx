import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Article, Section } from '../features/articles/article';
import { Text, View } from './Themed';
import * as React from 'react';

export function CompleteArticle({ article }: { article: Article }) {
  if (!article) {
    return <></>;
  }

  return (
    <ScrollView style={styles.readMore}>
      <Text style={styles.readMoreSummary}>{article.summary}</Text>
      {article.sections ? (
        article.sections.map((section: Section, index) => (
          <View style={{ backgroundColor: 'transparent' }} key={index}>
            <Text style={styles.readMoreTitle}>{section.title}</Text>
            <Text style={styles.readMoreContent}>{section.text}</Text>
          </View>
        ))
      ) : (
        <></>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  readMore: {
    padding: 20,
    height: Dimensions.get('window').height / 2 - 100,
    paddingBottom: 20,
  },
  readMoreTitle: {
    fontSize: 24,
    backgroundColor: 'transparent',
    paddingBottom: 10,
  },
  readMoreSummary: {
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  readMoreContent: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: 'transparent',
    paddingBottom: 30,
  },
});
