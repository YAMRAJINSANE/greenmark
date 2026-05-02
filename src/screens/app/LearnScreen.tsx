import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Card, Input, ScreenContainer } from '../../components';
import { DUMMY_ARTICLES } from '../../data/dummy';

interface LearnProps {
  onArticlePress: (articleId: string) => void;
}

export const LearnScreen: React.FC<LearnProps> = ({ onArticlePress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['Basics', 'Carbon Credits', 'Policy'];

  const filteredArticles = DUMMY_ARTICLES.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderArticle = ({ item }: { item: typeof DUMMY_ARTICLES[0] }) => (
    <TouchableOpacity
      onPress={() => onArticlePress(item.id)}
      activeOpacity={0.8}
    >
      <Card variant="outlined" style={styles.articleCard}>
        <View style={styles.articleHeader}>
          <View style={styles.articleInfo}>
            <Text style={styles.articleCategory}>{item.category}</Text>
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleExcerpt}>{item.excerpt}</Text>
          </View>
          <Text style={styles.readTime}>{item.readTime}m</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Learn About Sustainability</Text>
      <Text style={styles.subtitle}>Master carbon footprints and offset</Text>

      {/* Search */}
      <Input
        placeholder="Search articles..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === item && styles.categoryChipActive,
              ]}
              onPress={() =>
                setSelectedCategory(selectedCategory === item ? null : item)
              }
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === item && styles.categoryChipTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          scrollEnabled={false}
        />
      </View>

      {/* Articles List */}
      <FlatList
        data={filteredArticles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.sora,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.lg,
  },
  searchInput: {
    marginBottom: SPACING.lg,
  },
  categoriesContainer: {
    marginBottom: SPACING.lg,
  },
  categoryChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.neutral300,
    marginRight: SPACING.md,
    backgroundColor: COLORS.white,
  },
  categoryChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  categoryChipText: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  categoryChipTextActive: {
    color: COLORS.primary,
  },
  listContent: {
    paddingBottom: SPACING.lg,
  },
  articleCard: {
    marginBottom: SPACING.md,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  articleInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  articleCategory: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.xs,
  },
  articleTitle: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.sm,
  },
  articleExcerpt: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    lineHeight: 18,
  },
  readTime: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
});

export default LearnScreen;
