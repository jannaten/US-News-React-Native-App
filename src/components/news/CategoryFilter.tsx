import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CATEGORIES, type CategoryMeta } from '@constants/categories';
import { colors } from '@theme/colors';
import { textStyles } from '@theme/typography';
import { spacing, radius } from '@theme/spacing';
import type { NewsCategory } from '@app-types/api';

interface CategoryFilterProps {
  selected: NewsCategory;
  onSelect: (category: NewsCategory) => void;
}

function CategoryChip({
  item,
  isSelected,
  onPress,
}: {
  item: CategoryMeta;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.chip, isSelected && styles.chipSelected]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={`${item.label} news category`}
    >
      <Text style={styles.chipEmoji}>{item.emoji}</Text>
      <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{item.label}</Text>
    </TouchableOpacity>
  );
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CategoryChip
            item={item}
            isSelected={selected === item.id}
            onPress={() => onSelect(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.categoryChipBg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
    marginRight: spacing.sm,
  },
  chipSelected: { backgroundColor: colors.categoryChipActiveBg },
  chipEmoji: { fontSize: 14, marginRight: 5 },
  chipText: { ...textStyles.captionBold, color: colors.categoryChipText },
  chipTextSelected: { color: colors.categoryChipActiveText },
});
